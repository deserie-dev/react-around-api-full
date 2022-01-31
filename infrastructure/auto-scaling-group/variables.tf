variable "region" {
  description = "AWS region to create resources needed for the react-around-api-full application"
  type = string
  default = "us-east-2"
}

variable "instance_type" {
  type = string
  description = "EC2 instance type for launch template"
  default = "t2.micro"
}

variable "nginx_port" {
  type = string
  description = "Nginx port"
  default = 80
}

ami = "ami-0570553cbc6f0e057"
 instance_type = "t2.micro"