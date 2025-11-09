import { useState, useEffect } from "react";
import Styles from "./comentSection.module.css";
import {
  DSAInputForm,
  DSATextArea,
  DSAButton,
  DSAFileUpload,
  DSAComment,
} from "..";
import { MessageSquare } from "lucide-react";
import {
  getComments,
  createComment,
  uploadImage,
  type Comment,
} from "../../../application/services/commentsService"; // ajusta la ruta

const CommentsSection = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Comentario de bienvenida pinned
  const welcomeComment: Comment = {
    id: "welcome",
    name: "Kevin",
    role: "Admin",
    message:
      "Every comment helps me grow as a developer. Share your thoughts, suggestions, or ideas - let's learn together!",
    createdAt: new Date("2025-10-26").toISOString(),
    isPinned: true,
  };
  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getComments();
      // Combinar comentario de bienvenida con los del backend
      setComments([welcomeComment, ...data]);
    } catch (err) {
      setError("Error al cargar comentarios");
      console.error(err);
      // Mostrar al menos el comentario de bienvenida si falla
      setComments([welcomeComment]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) {
      setError("Por favor completa todos los campos requeridos");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let profilePhotoUrl: string | undefined;

      // Subir imagen a Cloudinary si existe
      if (profilePhoto) {
        profilePhotoUrl = await uploadImage(profilePhoto);
      }

      // Crear el comentario
      const newComment: Comment = {
        name,
        message,
        profilePhotoUrl,
      };

      const createdComment = await createComment(newComment);

      // Agregar el nuevo comentario DESPUÉS del comentario de bienvenida
      setComments((prev) => [prev[0], createdComment, ...prev.slice(1)]);

      // Limpiar el formulario
      setName("");
      setMessage("");
      setProfilePhoto(null);
    } catch (err) {
      setError("Error al enviar comentario");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Formatear fecha para mostrar
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calcular tiempo transcurrido
  const getTimeAgo = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className={Styles.commentsSection}>
      <div className={Styles.header}>
        <MessageSquare size={24} />
        <h2>Comments ({comments.length})</h2>
      </div>

      {error && <div className={Styles.error}>{error}</div>}

      <div className={Styles.commentsGrid}>
        <div className={Styles.formColumn}>
          <h3 className={Styles.columnTitle}>Leave a Comment</h3>
          <div className={Styles.commentForm}>
            <DSAInputForm
              type="text"
              placeholder="Enter your name"
              icon="User"
              label="Name"
              required
              value={name}
              onChange={setName}
            />

            <DSATextArea
              placeholder="Write your message here..."
              value={message}
              onChange={setMessage}
              label="Message"
              required
              rows={5}
              icon="MessageSquare"
            />

            <DSAFileUpload
              label="Profile Photo"
              optional
              maxSize="5MB"
              onFileSelect={setProfilePhoto}
            />

            <DSAButton
              onClick={handleSubmit}
              disabled={isSubmitting || !name.trim() || !message.trim()}
            >
              <span>{isSubmitting ? "Sending..." : "Send"}</span>
            </DSAButton>
          </div>
        </div>

        <div className={Styles.commentsColumn}>
          <h3 className={Styles.columnTitle}>All Comments</h3>
          {isLoading ? (
            <div className={Styles.loading}>Loading comments...</div>
          ) : (
            <div className={Styles.commentsList}>
              {comments.map((comment) => (
                <DSAComment
                  key={comment.id}
                  author={comment.name}
                  role={comment.role}
                  message={comment.message}
                  date={formatDate(comment.createdAt)}
                  timeAgo={getTimeAgo(comment.createdAt)}
                  avatarUrl={comment.profilePhotoUrl}
                  isPinned={comment.isPinned}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
