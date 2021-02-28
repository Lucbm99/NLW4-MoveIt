import Head from 'next/head';
import {GetServerSideProps} from 'next';

import { ChallengeBox } from '../components/ChallengeBox/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges.tsx/CompletedChallenges';
import { CountDown } from '../components/Countdown/Countdown';
import { ExperienceBar } from "../components/ExperienceBar/ExperienceBar";
import { Profile } from '../components/Profile/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  // console.log(props);

  return (
    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}  
    >
      <div className={styles.container}>
        <Head>
          <title>Início | MoveIt</title>
          <div className="title">MOVE IT</div>
          <p className="description">Melhorando sua qualidade de vida.</p>
        </Head>
        
        <ExperienceBar />

        <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <CountDown />
          </div>
            <ChallengeBox />
          <div>
          </div>
        </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}



export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //chamada api 
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;
  
  
  return {
    props: {
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted)
    }
  }
}