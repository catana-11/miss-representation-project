import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="page-content">
      <h1>About Me</h1>
      <br></br>
      <div className="aboutus-container">
        <section class="intro">
              <h2>Greetings!</h2>
              <p>Welcome to my project! I have been to a Hackathon before, but THIS is big scale! I am very excited to see what all other contenders create :)</p>
              <br></br>
          </section>

          <section class="myself">
              <h2>About me</h2>
              <p>I'm Shalaka from India- and yes, this is a solo project! People consider me as a creative, competitive and a curious individual.</p>
              <p>At 18 years old, I am in the first year of my CS engineering journey.</p>
              <p></p>
          </section>
          <br></br>

          <section class="about-this">
              <h2>About this project</h2>
              <p>Gender discrimination and misrepresentations have been spoiling humanity and morality since ages.</p>
              <p>In our GenZ terms, discriminatory views and rituals are nothing but "peer pressure from our ancestors".</p>
              <br></br>
              <p>To worsen things, unregulated internet access and boom of Social Media content in Covid has definitely made us all some what "dumbed down".</p>
              <p>It has resulted into reduced attention spans, and not being able to think for yourself. </p>
              <p>Many people fall prey to extremist political views, harsh religious banters and misogynistic ideologies.</p>
              <br></br>
              <p>A huge percentage of these people RARELY try to think by themselves if "Is this even logical?" or "Is this even required?"</p>
              <p>They justify spreading negetivity against women by calling it "Freedom of Speech".</p>
              <p>So, let us use this freedom of speech + technology to get back to them!</p>
              <br></br> </section>
      
        


        <footer>
            <p>Thank you for visiting my page, and I hope this project can inspire change and spark important conversations!</p>
        </footer>
        </div>
    </div>
  );
}

export default AboutUs;
