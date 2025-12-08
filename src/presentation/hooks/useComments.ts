import { useState, useEffect, useCallback, useMemo } from "react";
import { getComments, type Comment } from "../../application/services/commentsService";

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Comentario de bienvenida pinned
  const welcomeComment = useMemo(
    () => ({
      id: "welcome",
      name: "Kevin",
      role: "Admin",
      message:
        "Every comment helps me grow as a developer. Share your thoughts, suggestions, or ideas - let's learn together!",
      createdAt: new Date("2025-10-26").toISOString(),
      isPinned: true,
    } as Comment),
    []
  );

  const loadComments = useCallback(async () => {
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
  }, [welcomeComment]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  return {
    comments,
    setComments,
    isLoading,
    error,
    welcomeComment,
  };
};
