
<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/MindfulTrack/mindfultrack">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Mindfultrack</h3>

  <p align="center">
    <br />
    <a href="https://github.com/MindfulTrack/mindfultrack/README.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://mindfultrack.org">View Demo</a>
    ·
    <a href="https://github.com/MindfulTrack/mindfultrack/issues">Report Bug</a>
    ·
    <a href="https://github.com/MindfulTrack/mindfultrack/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li> -->
    <!-- <li><a href="#roadmap">Roadmap</a></li> -->
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://mindfultrack.org)

### MindfulTrack

MindfulTrack is an open-source service application designed to streamline the scheduling of mental health services. Our mission is to provide a simple and efficient solution that can be easily adopted by universities and companies alike.

### Purpose

The mental health of students and employees is paramount. However, managing and scheduling mental health services can often be a complex task. MindfulTrack aims to simplify this process, making it easier for institutions to provide the support their members need.

### Features

- **Efficient Scheduling**: MindfulTrack provides an intuitive interface for scheduling mental health services, reducing administrative overhead and improving accessibility.
- **Integration with AWS**: While MindfulTrack is designed to work with various cloud providers, it integrates best with Amazon Web Services (AWS), leveraging its robust and scalable infrastructure to ensure reliable service delivery.
- **Open Source**: MindfulTrack is open source, inviting developers from around the world to contribute and help improve mental health services scheduling.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

- **Frontend**: Utilizes **React** and **Next.js** for user interface, and **Material-UI (MUI)** for design components.
- **Backend**: Developed with the **Django** Python web framework.
- **Database**: Uses **PostgreSQL**, hosted on AWS's **RDS**.
- **Deployment**: Containerized and deployed via **AWS Fargate** and **ECS**.

This stack provides a comprehensive solution for developing a scalable mental health scheduling software.


* [![MUI][MUI]][MUI-url]
* [![React][React.js]][React-url]
* [![Next][Next.js]][Next-url]
* [![Django][Django.com]][Django-url]
* [![PostgreSQL][PostgreSQL.org]][PostgreSQL-url]
* [![AwsFargate][AwsFargate]][Fargate-url]
* [![AwsEcs][AwsEcs]][Ecs-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Mindfultrack is built upon Django and Next js. Both servers will need to be initialized

### Prerequisites

Install Node
Install Python 3.12

### Installation

_After installing python and node you can setup the Next.js server and Django server._

#### SETUP NEXT.JS
1. Clone the repo
```sh
  git clone https://github.com/MindfulTrack/mindfultrack.git
```
2. Install NPM packages
```sh
  npm install
```
3. Create .env.local file in nextjs_server folder. Add the following:
```sh
  NEXTAUTH_URL=http://127.0.0.1:3000/
  NEXTAUTH_SECRET=<add here>
  NEXTAUTH_BACKEND_URL=http://127.0.0.1:8000/api/
  NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000/api/
  NEXT_PUBLIC_BACKEND_URL_BASE=http://127.0.0.1:8000/

  GOOGLE_CLIENT_ID=<add here>
  GOOGLE_CLIENT_SECRET=<add here>

  NEXT_PUBLIC_BASE_URL_DEV=http://localhost:3000
  NEXT_PUBLIC_BASE_URL_PROD=<add here>

```
4. Run Next.js Server
```sh
  npm run dev
```

#### SETUP DJANGO
1. Install Django and Dependencies
```python
  pip install -r requirements.txt
```
2. Create .env.dev file in django_server folder. Add the following:
```sh
  DB_ENGINE=<add here>
  POSTGRES_DB=<add here>
  POSTGRES_USER=<add here>
  POSTGRES_PASSWORD=<add here>
  DB_HOST=<add here - we recommend using rds on aws>
  DB_PORT=<add here>

  DJANGO_SECRET=<add here>
  EMAIL_HOST=<add here - we recommend using AWS SES>
  EMAIL_PORT=<add here>
  EMAIL_HOST_USER=<add here - ses iam user in aws>
  EMAIL_HOST_PASSWORD=<add here>

  GOOGLE_CLIENT_ID=<add here>
  GOOGLE_CLIENT_SECRET=<add here>

  CALLBACK_URL="http://127.0.0.1:3000/"
  EMAIL_CONFIRM_REDIRECT_BASE_URL="http://localhost:3000/email/confirm/"
  PASSWORD_RESET_CONFIRM_REDIRECT_BASE_URL="http://localhost:3000/password-reset/confirm/"

  ENVTYPE="DEV"

  AWS_ACCESS_KEY=<local development purposes only>
  AWS_SECRET_KEY=<local development purposes only>
  ```
3. Migrate Scheme to Database
```python
  python manage.py migrate
```
4. Run Server
```python
  python manage.py runserver
```  

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Integrations
MindfulTrack was built with AWS ECS and github actions making it easy for universities to fork the project and use the task definitions to automatically deploy a live site to their AWS account. If setup correctly every merge should result in a redeployment on the live site allowing for quick updates the production site.

Keys for a successful integration:
1. Setup an AWS Account
2. Follow pipeline setup steps in [cicd-workflow.yml](.github\workflows\cicd-workflow.yml) found in the .github\workflows folder. 
3. Update the [mindfultrack-task-definition.json](.github\workflows\mindfultrack-task-definition.json) to meet the needs of your container instances as well as to map to the appropriate resources.
4. Add .env file to root directory outside of nextjs_server and django_server
```sh
  ECR_REGISTRY=<add registry>
  ECR_REPOSITORY_CLIENT=<add here>
  ECR_REPOSITORY_SERVER=<add here>
  IMAGE_TAG=<add here>

  ```
#### Other recommendations
1. Register a domain on route 53 and route to the load balancer created during the ECS pipeline process and setup above.
2. Register with AWS SES (Simple Email Service) to add emailing functionality quickly.
3. Provision a phone number through AWS Pinpoint to implement texting.



<!-- USAGE EXAMPLES -->
<!-- ## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- ROADMAP -->
<!-- ## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/MindfulTrack/mindfultrack/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

<!-- Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com -->

Project Link: [https://github.com/MindfulTrack/mindfultrack](https://github.com/MindfulTrack/mindfultrack)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Choose an Open Source License](https://choosealicense.com)
* [Readme Tempalte](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/MindfulTrack/mindfultrack.svg?style=for-the-badge
[contributors-url]: https://github.com/MindfulTrack/mindfultrack/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/MindfulTrack/mindfultrack.svg?style=for-the-badge
[forks-url]: https://github.com/MindfulTrack/mindfultrack/network/members
[stars-shield]: https://img.shields.io/github/stars/MindfulTrack/mindfultrack.svg?style=for-the-badge
[stars-url]: https://github.com/MindfulTrack/mindfultrack/stargazers
[issues-shield]: https://img.shields.io/github/issues/MindfulTrack/mindfultrack.svg?style=for-the-badge
[issues-url]: https://github.com/MindfulTrack/mindfultrack/issues
[license-shield]: https://img.shields.io/github/license/MindfulTrack/mindfultrack.svg?style=for-the-badge
[license-url]: https://github.com/MindfulTrack/mindfultrack/blob/master/LICENSE.txt
<!-- [linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555 -->
<!-- [linkedin-url]: https://linkedin.com/in/othneildrew -->
[product-screenshot]: images/mindfultrackhomepage.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[PostgreSQL.org]: https://img.shields.io/badge/postgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Django.com]: https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white
[Django-url]: https://django.com
[AwsFargate]: https://img.shields.io/badge/awsfargate-FF9900?style=for-the-badge&logo=awsfargate&logoColor=white
[Fargate-url]: https://aws.amazon.com/fargate/
[AwsEcs]: https://img.shields.io/badge/amazonecs-FF9900?style=for-the-badge&logo=amazonecs&logoColor=white
[Ecs-url]: https://aws.amazon.com/ecs/
[MUI]: https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://mui.com/