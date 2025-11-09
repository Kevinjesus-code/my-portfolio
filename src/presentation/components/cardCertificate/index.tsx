import Styles from "./cardCertificate.module.css";
import { Calendar, Clock, ExternalLink, X } from "lucide-react";
import { useState } from "react";

interface Certificate {
  id: number;
  courseName: string;
  platform: string;
  logo: string;
  instructor: string;
  completionDate: string;
  duration: string;
  skills: string[];
  pdfUrl: string;
}

interface CardCertificateProps {
  certificate: Certificate;
}

const CardCertificate = ({ certificate }: CardCertificateProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  const displayedSkills = showAllSkills
    ? certificate.skills
    : certificate.skills.slice(0, 3);

  const remainingSkills = certificate.skills.length - 3;

  return (
    <>
      <div className={Styles.certificateCard}>
        <div className={Styles.certificateIcon}>
          <img
            src={certificate.logo}
            alt={`${certificate.platform} - ${certificate.courseName}`}
          />
        </div>

        <div className={Styles.certificateInfo}>
          <h3 className={Styles.certificateTitle}>{certificate.courseName}</h3>

          <div className={Styles.certificateInstructor}>
            <span className={Styles.platformBadge}>{certificate.platform}</span>
            por {certificate.instructor}
          </div>

          <div className={Styles.certificateMeta}>
            <div className={Styles.metaItem}>
              <Calendar />
              <span>{certificate.completionDate}</span>
            </div>
            <div className={Styles.metaItem}>
              <Clock />
              <span>{certificate.duration}</span>
            </div>
          </div>

          <div className={Styles.skillsContainer}>
            {displayedSkills.map((skill, idx) => (
              <span key={idx} className={Styles.skillTag}>
                {skill}
              </span>
            ))}
            {!showAllSkills && remainingSkills > 0 && (
              <button
                className={Styles.moreSkillsBtn}
                onClick={() => setShowAllSkills(true)}
              >
                +{remainingSkills} más
              </button>
            )}
            {showAllSkills && certificate.skills.length > 3 && (
              <button
                className={Styles.moreSkillsBtn}
                onClick={() => setShowAllSkills(false)}
              >
                Ver menos
              </button>
            )}
          </div>
        </div>

        <button
          className={Styles.viewCertificateBtn}
          onClick={() => setShowModal(true)}
        >
          Ver Certificado
          <ExternalLink size={18} />
        </button>
      </div>

      {showModal && (
        <div className={Styles.modal}>
          <div className={Styles.modalHeader}>
            <div className={Styles.modalTitle}>{certificate.courseName}</div>
            <button
              className={Styles.closeBtn}
              onClick={() => setShowModal(false)}
            >
              <X size={40} />
            </button>
          </div>
          <iframe
            className={Styles.pdfViewer}
            src={`${certificate.pdfUrl}#toolbar=0`}
            title="Certificado PDF"
          
          />
        </div>
      )}
    </>
  );
};

export default CardCertificate;
