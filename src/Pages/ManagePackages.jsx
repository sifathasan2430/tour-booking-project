import React, { useContext, useEffect, useState } from "react";
import UserAuthContext from "../Context/Context";

import { HiH1 } from "react-icons/hi2";
import Swal from "sweetalert2";
import { NavLink } from "react-router";
import useAxiosSecure from "../Customhook/useAxiosSecure";
import Loader from "../Component/Loader";

const ManagePackages = () => {
  const { user } = useContext(UserAuthContext);
  const [guidePackage, setGuidePackage] = useState([]);
  const axiosSecure =useAxiosSecure()
  useEffect(() => {
    axiosSecure.get("/private/alltourpackage", {
        params: {
          email: user?.email,
        }
      })
      .then((res) => {
        setGuidePackage(res.data);
       
      });
  }, []);
  const deletePackage = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/package/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",

              icon: "success",
            });

            const filter = guidePackage.filter((items) => items._id !== id);
            setGuidePackage(filter);
          }
        });
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      {guidePackage.length > 0 ? (
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>NO</th>
              <th>GuideInfo</th>
              <th>Tour Name</th>
              <th>Booked</th>
              <th>Customize</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {guidePackage.map((items, index) => (
              <tr key={items._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={items.guidePhoto}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{items.guideName}</div>
                      <div className="text-sm opacity-50">
                        {items.guideEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{items.tourName}</td>
                <td>{items.bookingCount}</td>
                <td>
                  <div className="join gap-1">
                    <button className="btn btn-secondary join-item   btn-xs">
                      <NavLink to={`/updatepackage/${items._id}`}>Update</NavLink>
                    </button>
                    <button
                      onClick={() => deletePackage(items._id)}
                      className="btn btn-warning join-item btn-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      ) : <Loader></Loader>
      }
    </div>
  );
};

export default ManagePackages;
