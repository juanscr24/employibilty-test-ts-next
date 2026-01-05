// import styled from "styled-components";

interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  onClick,
}) => {
  return (
     <div
      onClick={onClick}
      className="
        w-75
        rounded-xl
        bg-white
        overflow-hidden
        cursor-pointer
        shadow-[0_8px_20px_rgba(0,0,0,0.12)]
        transition
        duration-200
        ease-in-out
        hover:-translate-y-1
        hover:shadow-[0_12px_25px_rgba(0,0,0,0.18)]
      "
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover"
        />
      )}

      <div className="p-4">
        <h3 className="mb-2 text-[1.2rem] text-[#333] font-semibold">
          {title}
        </h3>

        {description && (
          <p className="text-[0.95rem] text-[#666] leading-[1.4]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
