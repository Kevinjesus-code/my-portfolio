import {
  DSAContactMeMessage,
  DSACardSocialLinks,
  DSACommentSection,
} from "../../components";
import Styles from "./contacMe.module.css";
import type { Comment } from "../../../application/services/commentsService";

interface ContactMeProps {
  commentsData?: {
    comments: Comment[];
    setComments: (comments: Comment[]) => void;
    isLoading: boolean;
    error: string | null;
    welcomeComment: Comment;
  };
}

const ContactMe = ({ commentsData }: ContactMeProps) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.containerBody}>
        <DSAContactMeMessage  />
        <DSACardSocialLinks />
      </div>
      <DSACommentSection commentsData={commentsData} />
    </div>
  );
};

export default ContactMe;
