const CarouselItem = ({ children, width }) => {
  return (
    <div
      className="inline-flex items-center justify-center h-screen bg-green-600 text-white"
      style={{ width: width }}
    >
      {children}
    </div>
  );
};

export default CarouselItem;
