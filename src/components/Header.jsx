const Header = ({ title, points }) => (
    <div className="flex justify-between items-center py-6 px-8 bg-gray-100 rounded-lg mb-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-xl font-semibold">Points: {points}</p>
      </div>
    </div>
  );

    export default Header;