import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/auth";
import { data } from "../data/Data";
import "../styles/Medications.css";

type ListType = {
  key?: number;
  name: string;
};

export const Medications = () => {
  const url = "https://djbnrrib9e.execute-api.us-east-2.amazonaws.com/v1";

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [list, setList] = useState<ListType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { state } = useContext(Context);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const toggleButton = () => {
    navigate("/signupmedications");
  };

  const loadingMedicines = async () => {
    const response = await fetch(`${url}/medications?&page=${page}&limit=15`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${state.user.token}`,
      },
    });
    let json = await response.json();
    setList(json.data);
    setTotalPages(json.last_page);
    console.log(state.user.token);
  };

  const handleButtonSearch = async () => {
    if (search != "" && search.length >= 3) {
      const response = await fetch(
        `${url}/medications?&page=${page}&limit=15&search=${search}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${state.user.token}`,
          },
        }
      );
      let json = await response.json();
      console.log(json);
      setList(json.data);
      setTotalPages(json.last_page);
    } else if (search != "" || (search.length < 3 && search.length > 0)) {
      window.alert("Digite pelo menos 3 caracteres");
      loadingMedicines();
    } else {
      loadingMedicines();
    }
  };

  useEffect(() => {
    loadingMedicines();
  }, []);

  const handlePrev = () => {
    setPage(page - 1);
    loadingMedicines();
  };
  const handleNext = () => {
    setPage(page + 1);
    loadingMedicines();
  };

  return (
    <div className="container">
      <div className="column-one">
        <img src={data} alt="Logo" className="img-logo" />
        <br />
        <br />
        <button onClick={toggleButton} className="button-register">
          Register Medications
        </button>
      </div>
      <div className="column-two">
        <section className="search-medicine">
          <input
            type="text"
            placeholder="Type the name of the Medicine"
            value={search}
            onChange={handleSearch}
            className="search-input"
          />
          <button className="button-search" onClick={handleButtonSearch}>
            Search
          </button>
        </section>
        <div className="list-container">
          {
            <div className="list-medicines">
              {list.map((item: any, key) => (
                <span className=" list-items" key={key}>
                  {item.drug_name}
                </span>
              ))}
            </div>
          }
          <div className="next-preview">
            {page > 1 ? (
              <button className="button-preview" onClick={handlePrev}>
                Previews
              </button>
            ) : (
              <div></div>
            )}
            <span>{page}</span>
            {page < totalPages ? (
              <button className="button-next" onClick={handleNext}>
                Next
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
