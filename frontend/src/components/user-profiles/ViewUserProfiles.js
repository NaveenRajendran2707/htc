import { Search } from "..";

const ViewUserProfiles = ({ data, setQ, q, searchHandler }) => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between mb-3">
        <h2 className="font-bold text-2xl text-gray-800 my-1">User Profiles</h2>
        <div className="flex flex-wrap gap-3">
          <Search
            placeholder="Search by email"
            setQ={setQ}
            q={q}
            searchHandler={searchHandler}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-800 rounded">
          <thead className="text-xs text-slate-800 bg-slate-200 shadow-sm border-y border-slate-300">
            <tr>
              <th className="p-2">SI.NO</th>
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Address</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Email</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.data.map((userProfile, index) => (
                <tr key={userProfile._id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    <img
                      width="30"
                      height="30"
                      src={userProfile.image}
                      alt={userProfile.name}
                      className="max-w-full h-auto object-cover rounded-full"
                    />
                  </td>
                  <td className="p-2">{userProfile.name}</td>
                  <td className="p-2">{userProfile.address}</td>
                  <td className="p-2">{userProfile.phone}</td>
                  <td className="p-2">
                    {userProfile.user && userProfile.user.email}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewUserProfiles;
