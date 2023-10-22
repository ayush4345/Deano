
<div align="center">

<img src="../Deano/client/public/assets/logo.jpeg" alt="deano_logo" border="1" width="100"/>



  <p align="center">
    Shaping the world with Decentralised Annotations!
  </p>
</div>


<br/>

![HomePage](../Deano/client/public/assets/home_page.png)
![TaskPage](../Deano/client/public/assets/task_page.png)
![Sismo Claim](../Deano/client/public/assets/claim_money.png)
![Annotate Page](../Deano/client/public/assets/annotate_page.jpg)


<br/>

## Table of Contents

1. [Project Idea](#project-idea)
2. [Our Approach](#our-approach)
3. [Challenges We Faced](#challenges-we-faced)
4. [Technologies We Used](#technologies-we-used)
5. [Architecture](#architecture)
6. [Installation and Setup Guide](#installation-and-setup-guide)
7. [Team Members](#team-members)

<br/>


## Project Idea

* Authenticity and Quality of Data used for training Machine Learning models is a major concern in the industry. We often have to blindly trust the data provided by centralized data providers, and there is no way to verify the authenticity of the data.

* The existing data annotation platforms, such as 'Kaggle,' suffer from centralization, where the data provided is often not rigorously validated for accuracy, leading to potential data quality issues. Moreover, these platforms lack a systematic reward mechanism for annotators, making it less appealing for individuals looking to contribute.

* In response to this challenge, Deano presents a groundbreaking solution in the realm of data annotation, designed to address critical issues in the current landscape. It endeavors to create a transparent and decentralized platform that fundamentally transforms the data annotation process.


* Deano steps in as a transformative force to rectify these shortcomings. It establishes a decentralized ecosystem where vendors can post data annotation jobs with confidence. Annotators, part of the Deano community, are incentivized with DAN tokens for accurate data labeling, creating a win-win situation for both vendors and annotators. This reputation-based reward system ensures quality and trust in the data annotation process.

In summary, Deano aims to ensure the authenticity and quality of data used for machine learning models by offering a transparent and decentralized platform. It leverages a reputation-based reward system to encourage community-driven, accurate data labeling, thereby addressing the centralization and quality issues prevalent in current data annotation platforms.

<br/>

## Our Approach



### Actors 

- **Vendors** - Vendors are the people who upload their data to the platform and request for annotations. 
- **Annotators** - Annotators are the people who annotate the data uploaded by the vendors.

### Workflow

- Vendors upload their data to the platform and request for annotations.
- Annotators verify the authenticity of the data and annotate the data.
- Annotators are rewarded for their contribution to the platform based on a reputation metric for each individual.

### How Accuracy is maintained

The accuracy of the annotations is maintained by a reputation aggregation system. Each annotator has a reputation score which is calculated based on the accuracy of the annotations done by the annotator.

Multiple annotators annotate the same data. These annotations are aggregated and checkout for majority vote. The annotators who have the same annotations as the majority are rewarded with a reputation score. The annotators who have different annotations are penalized with a negative reputation score.

By Game Theory, we can prove that we can go forward with this optimistic assumption that the majority of the annotators will be honest and will annotate the data correctly and there will be a few annotators who will try to cheat the system due to the design of the reputation system.

### How Annotators are rewarded

Each annotator will be rewarded based on the reputation score. The reputation score is calculated based on the accuracy of the annotations done by the annotator. The reputation score is calculated using the following formula.

```
Reputation Score = (Number of correct annotations - Number of incorrect annotations) / (Number of correct annotations + Number of incorrect annotations)
```

This score is continuously updated as the annotator annotates more data. The reputation score is used to calculate the payout for each annotator. The payout is calculated using the following formula.

```
Payout = Reputation Score * Base Payout
```

### Summary
* Vendors entrust their data to Deano for accurate annotations.
* Annotators, who play a critical role, meticulously label datasets within specific timeframes.
* 'DAN' tokens, Deano's proprietary cryptocurrency, are used by vendors to create job listings with enticing bounties.
* Annotators receive rewards in DAN tokens, redeemable through weekly payouts.
* The platform employs a sophisticated reputation system, overseen by Sismo, where the accuracy of annotations is paramount. Incorrect annotations may result in reputation deductions and potential reductions in payouts.
* To facilitate seamless communication, Deano offers a chat function powered by XMTP-JS, aiding discussions between annotators and vendors, especially concerning job-related inquiries.
* In future developments, Deano plans to integrate a feature for DAN token transfers through a bridge accessible within the chat interface.
* Data management is efficiently handled with the assistance of Tableland, serving as a central repository for vendor job listings. Secure dataset storage is ensured through the utilization of the IPFS service web3.storage, enhancing the overall robustness and security of the platform.
<br/>


## Challenges We Faced

* Implementing onchain testing for Sismo proved to be a challenging task, as tracking onchain changes was intricate.
* While working with XMTP Chat, we faced difficulties adapting to the latest features due to breaking changes in the latest versions. Fortunately, we received valuable support from the community in resolving these conflicts.
* Configuring and setting up the workflow for Tableland initially presented challenges. However, with substantial community assistance, we successfully addressed these issues, ensuring its smooth operation.

<br/>

## Technologies We Used

![Nextjs](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

### [Sismo](https://www.sismo.io/)
* Sismo plays a pivotal role in providing periodic salaries to our annotators based on their reputation metrics.
* It offers the capability to selectively distribute payouts exclusively within the Deano platform, ensuring financial transactions remain within our ecosystem.

### [Push Protocol](https://push.org/) 
* The Push Protocol serves the essential function of notifying annotators about newly added job listings by vendors.
* It plays a crucial role in keeping the entire ecosystem up-to-date by delivering notifications that are vital to annotators' work.

### [Tableland](https://tableland.xyz/)
* Within Deano, Tableland serves as a comprehensive solution for the streamlined management of vendor job listings.
* It simplifies the overall workflow within the web3 framework, enhancing efficiency and accessibility.

### [XMTP Chat](https://xmtp.org/)
* Stay seamlessly connected with the Vendor for real-time updates on job listings and address any related queries.
* Annotators have the convenience of direct communication with vendors for additional job-related updates.
* In the future, our plans include implementing the [Connext Network](https://www.connext.network/) to facilitate a seamless token transfer bridge, enabling efficient transactions between vendors and annotators, as well as among annotators themselves.


### [Privy](https://www.privy.io/)
* Privy enhances the user experience of web3 products to a level comparable to web2, offering features like seamless email and social media sign-ins. It not only boosts conversion rates but also broadens the potential user base for your app.
* Deano leverages Privy for smooth user onboarding, allowing users to authenticate using their email address and social logins. This streamlined process simplifies their entry into the web3 world.

### [web3.storage](https://web3.storage/)
* In our infrastructure, web3.storage plays a pivotal role as it serves as the repository for all the images uploaded by vendors on the blockchain.

### [The Graph](https://thegraph.com/)
* Our utilization of The Graph extends to the development of a dynamic leaderboard system. This system ranks the most distinguished annotators and vendors based on their reputation, providing a transparent and insightful view of their contributions to the Deano platform.

<br/>

## Architecture

![Architecture](../Deano/client/public/assets/Deano.png)


<br/>

## Installation and Setup Guide
To get started with Deano, follow these steps:

1. Clone the repo: `git clone https://github.com/ayush4345/Deano.git`
2. `cd Deano`

### Install the Next.js Frontend

1. Change directory to client by `cd client`
2. Install npm packages by running `npm i`
3. Start the dev server by running `npm run dev`

<br/>

## Team Members

[Shubham Rasaal](https://devfolio.co/@bluequbits)

[Ayush Kumar Singh](https://devfolio.co/@ayush4345)

[Mardav Chirag Gandhi](https://devfolio.co/@MCG)
