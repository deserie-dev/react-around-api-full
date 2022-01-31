provider "aws" {
 profile = "react-around-api-full"
 region = "us-east-1"
}

resource "aws_instance" "example" {
 ami = "ami-0570553cbc6f0e057"
 instance_type = "t2.micro"

 tags = {
  Name = "react-around-api-full"
 }
}