// Configuración de URLs según el entorno
const API_URL = import.meta.env.PROD 
  ? "https://backend-my-portfolio-fpu6.onrender.com/api/comments"
  : "http://localhost:4000/api/comments";
const CLOUDINARY_CLOUD_NAME = "dsmyghxcn"; 
const CLOUDINARY_UPLOAD_PRESET = "portfolio_comments";

export interface Comment {
  id?: string;
  name: string;
  message: string;
  profilePhotoUrl?: string;
  role?: string;
  isPinned?: boolean;
  createdAt?: string;
}

// Obtener comentarios
export const getComments = async (): Promise<Comment[]> => {
  try {
    const res = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error response:', errorText);
      throw new Error(`Error al obtener comentarios: ${res.status}`);
    }else{
       const data = await res.json();
        return data;
    }
    
   
    
   
  } catch (error) {
    console.error('Error en getComments:', error);
    throw error;
  }
};

// Crear comentario
export const createComment = async (comment: Comment): Promise<Comment> => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error response:', errorText);
      throw new Error(`Error al enviar comentario: ${res.status}`);
    }
    
    const data = await res.json();
   
    return data;
  } catch (error) {
    console.error('Error en createComment:', error);
    throw error;
  }
};

// Eliminar comentario
export const deleteComment = async (id: string): Promise<void> => {
  try {
    const deleteUrl = API_URL.replace('/comments', `/comments/${id}`);
    const res = await fetch(deleteUrl, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
      },
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error response:', errorText);
      throw new Error(`Error al eliminar comentario: ${res.status}`);
    }
    
    
  } catch (error) {
    console.error('Error en deleteComment:', error);
    throw error;
  }
};

// Subir imagen a Cloudinary
export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error Cloudinary:', errorText);
      throw new Error(`Error al subir imagen: ${res.status}`);
    }
    
    const data = await res.json();
    
    return data.secure_url;
  } catch (error) {
    console.error('Error en uploadImage:', error);
    throw error;
  }
};