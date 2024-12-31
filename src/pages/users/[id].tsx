// pages/users/[id].tsx

import { GetServerSideProps } from "next";
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
import FollowButton from "../../components/FollowButton";

interface UserProfileProps {
  user: {
    _id: string;
    name: string;
    email: string;
    image: string;
    backgroundImage: string;
    followers: number;
    following: number;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div style={styles.container}>
      <div style={{ ...styles.background, backgroundImage: `url(${user.backgroundImage})` }}></div>
      <img src={user.image} alt={user.name} style={styles.profileImage} />
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>フォロワー: {user.followers}</p>
      <p>フォロー中: {user.following}</p>
      <FollowButton targetId={user._id} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();

  const { id } = context.params!;
  const user = await User.findById(id).lean();

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image || "",
        backgroundImage: user.backgroundImage || "",
        followers: user.followers.length,
        following: user.following.length,
      },
    },
  };
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "relative",
    padding: "2rem",
    textAlign: "center",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "200px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,
    opacity: 0.5,
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "5px solid #fff",
    marginTop: "1rem",
  },
};

export default UserProfile;
