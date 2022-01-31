resource "aws_autoscaling_group" "asg" {
  name                 = "react-around-api-full-asg"
  min_size             = 2
  max_size             = 3
  termination_policies = ["OldestInstance"]

  launch_template {
    id = "aws_launch_template.lt_template.id"
  }

  tag {
    key                 = "Name"
    value               = "react-around-api-full-asg"
    propagate_at_launch = true
  }

}

resource "aws_launch_template" "template" {
  name                   = "react-around-api-full"
  instance_type          = "t2.micro"
  image_id               = "ami-0570553cbc6f0e057"
  ebs_optimized          = true
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
}

resource "aws_security_group" "ec2_sg" {
  name        = "react-around-api-full-sg"
  description = "react-around-api-full-sg, allow HTTP inbound connections"
  vpc_id      = aws_default_vpc.default.id

  ingress {
    from_port   = var.nginx_port
    to_port     = var.nginx_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Allow HTTP Security Group"
  }

}

resource "aws_default_vpc" "default" {
  tags = {
    Name = "Default VPC"
  }
}

data "aws_subnet_ids" "default" {
  vpc_id = aws_default_vpc.default.id
}

resource "aws_lb" "lb" {
  name               = "var.alb_name"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = [data.aws_subnet_ids.subnets.ids]
}

resource "aws_security_group" "alb" {
  name = "var.alb_security_group_name"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_lb_listener" "listener" {
  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "application/json"
      message_body = "Unauthorised"
      status_code  = 401
    }
  }

  load_balancer_arn = aws_lb.lb.arn
  port              = 80
  protocol          = "HTTP"
}

resource "aws_lb_listener_rule" "asg" {
  listener_arn = aws_lb_listener.listener.arn
  priority     = 100

  condition {
    path_pattern {
      values = ["*"]
    }
  }

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.asg.arn
  }
}

resource "aws_lb_target_group" "asg" {
  name     = var.alb_name
  protocol = "HTTP"
  port     = var.nginx_port
  vpc_id   = aws_default_vpc.default.id

  health_check {
    path                = "/"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 10
    unhealthy_threshold = 2
  }
}