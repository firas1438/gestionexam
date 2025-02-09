
type UserCardProps = {
  type: string;
  count: string | number; // Accept both strings and numbers
};

const getAcademicYear = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // getMonth() is 0-based

  // If it's before September, we're still in the previous academic year
  const startYear = month >= 9 ? year : year - 1;
  const endYear = startYear + 1;

  return `${startYear}/${endYear.toString().slice(-2)}`;
};

const UserCard = ({ type, count }: UserCardProps) => {
  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          {getAcademicYear()}
        </span>
      </div>
      <h1 className="text-2xl font-semibold my-4">
        {typeof count === 'number' ? count.toLocaleString("fr-FR") : count}
      </h1>

      <h2 className="text-sm font-medium text-gray-500">{type}(s)</h2>
    </div>
  );
};

export default UserCard;

