# YPracticum Web Developer Bootcamp: Project 15

---

**PLEASE NOTE: I'm migrating this site to AWS. It will be back up in January 2022.**

---

**Live Site Deployed on Google Cloud Platform**
[https://deserie.students.nomoreparties.site/signin](https://deserie.students.nomoreparties.site/signin)

You can use the following details to log in:

email: deserie.demo@gmail.com

password: 12345

---

<details>
<summary><b>The Application</b></summary><p>

This is a 3-tier application with a React based frontend, Express.js API and MongoDB database.

## Functionality:

- Allows users to register and login using an email address and password. JWT have been used to ensure users don't have to re-enter their credentials when they revisit the site. Tokens are valid for 7 days.
- Allows users to update their profile name, profile picture and description
- Allows users to post/delete/like/dislike cards. Users can delete only the cards they themselves created.
- MongoDB is used for storing user and cards data
- Authentication using JSON web tokens
- Let's Encrypt SSL certificate
- Helmet used to secure HTTP headers returned by Express app
- CORS protection allows access only from selected routes
- Data validation with Celebrate and Joi
- Bcrypt used for password hashing.
- Winston is used to provide error and request logging for easier maintenance

</p></details>

<details>
<summary><b>Infrastructure as Code</b></summary><p>

1. I used HashiCorp's Packer to create a custom AMI (Amazon Machine Image). An Ansible provisioner installs Node, MongoDB, and Git onto an Ubuntu 18 image. I use this custom AMI to spin up EC2 instances in an Auto Scaling Group in step 2.

2. I used Terraform to provision the AWS infrastructure needed for this application to run, namely an AWS Auto Scaling Group that has a load balancer in front of it, as well as the necessary networking infrastructure such as the VPC, subnets and security groups.

The original project brief required us to host our application on a single VM. Running a single server however, presents the problem of a single point of failure. So the solution was to launch a cluster of EC2 Instances. I chose to make use of AWS Auto Scaling Groups which launches a cluster of EC2 Instances,monitors the health of each Instance, replaces failed Instances, and adjusts the size of the cluster in response to load.

Inside my main.tf I used a launch template to define how I wanted my Instances configured. For the _image_id_ I used the AMI ID of the custom AMI I created using Packer.

In the _auto-scaling_ resource block, I chose to have a desired capacity of 2 EC2 Instances running at all times, which if needed can scale up to a maximum of 3.

I also deployed a load balancer to distribute traffic across my servers through Amazon’s Elastic Load Balancer (ELB) service. AWS offers different types of load balancers. Since my application has no extreme performance requirements, I went with the Application Load Balancer.

By default, all AWS resources, including ALBs, don’t allow any incoming or outgoing traffic, so I ceated a new security group specifically for the ALB. It allows incoming requests on port 80 so that the load balancer can be accessed over HTTP, and outgoing requests on all ports so that the load balancer can perform health checks on the Instances.

</p></details>
