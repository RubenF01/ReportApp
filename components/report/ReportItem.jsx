const ReportItem = ({
  report: { lat, lng, referencias, status, creationDate, imagenes },
}) => {
  const cover = imagenes[0];
  return (
    <div>
      <img src={cover} alt={referencias} className="w-24 h-24" />
    </div>
  );
};

export default ReportItem;
