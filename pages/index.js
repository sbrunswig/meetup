import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="browse list of react meetups"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// executed during build process on server
export async function getStaticProps() {
  // fetch data
  const client = await MongoClient.connect("mongodb+srv://atlas:MON!jul21@cluster0.mnljr.mongodb.net/meetups_db?retryWrites=true&w=majority");
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // rebuilds data every 10 sec
    revalidate: 1,
  };
}

export default HomePage;
