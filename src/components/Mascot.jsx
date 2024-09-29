const Mascot = ({ image }) => (
    <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none">
      <img
        src={image}
        alt="Budget Mascot"
        className="w-full h-full object-contain"
      />
    </div>
  );

export default Mascot;