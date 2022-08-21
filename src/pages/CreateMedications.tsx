import { FormEvent, useContext, useEffect, useState } from "react";
import { Context } from "../Context/auth";
import { data } from "../data/Data";
import "../styles/CreateMedications.css";

type ManufacturersType = {
  key?: number;
  name: string;
};

type MedicationType = {
  drugName: string;
  unitsPerPackage: number;
  issuedOn: any;
  expiresOn: any;
  manufacturers: [brand: string];
};

export const CreateMedications = () => {
  const url = "https://djbnrrib9e.execute-api.us-east-2.amazonaws.com/v1";
  const [drugName, setDrugName] = useState("");
  const [itemPerPackage, setItemPerPackage] = useState(0);
  const [manufac, setManufac] = useState("");
  const [manufacturers, setManufacturers] = useState<ManufacturersType[]>([]);
  const [manufacturersTwo, setManufacturersTwo] = useState("");
  const [expiresDate, setExpiresDate] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [time, setTime] = useState("");
  const [expiresStringDate, setExpiresStringDate] = useState("");
  const [issuedStringDate, setIssuedStringDate] = useState("");
  const { state } = useContext(Context);

  const Data = () => {
    setInterval(() => {
      let date = new Date();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let milliseconds = date.getMilliseconds();
      setTime(`T${hour}:${minutes}:${seconds}.${milliseconds}Z`);
    }, 1);
  };

  const loadingMedicines = async () => {
    const response = await fetch(`${url}/manufacturers`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${state.user.token}`,
      },
    });
    let json = await response.json();
    setManufacturers(json.data);
  };

  const toggleButtonCreateMedications = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${url}/medications`, {
      method: "POST",
      body: JSON.stringify({
        drug_name: drugName,
        units_per_package: itemPerPackage,
        issued_on: issuedStringDate,
        expires_on: expiresStringDate,
        manufacturers: [`${manufacturersTwo}`],
      }),
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.user.token}`,
      },
    });
    let json = await response.json();
    console.log(response.status);
    if (response.status == 201) {
      window.alert("Produto Cadastrado com sucesso");
    } else if (response.status == 400) {
      window.alert("Falha na autenticação");
    } else {
      window.alert("Erro desconhecido");
    }
  };

  useEffect(() => {
    loadingMedicines();
    Data();
  }, []);

  useEffect(() => {
    setIssuedStringDate(`${issuedDate}${time}`);
    setExpiresStringDate(`${expiresDate}${time}`);
    setManufacturersTwo(manufac);
  }, [time]);

  return (
    <div className="container">
      <div className="column-one">
        <img src={data} alt="Logo" className="img-logo-two" />
      </div>
      <div className="container-register">
        <h1 className="medicine-register">Medicines Registration</h1>
        <form
          onSubmit={toggleButtonCreateMedications}
          className="form-container"
        >
          <section className="name-section">
            <label htmlFor="" className="name-label">
              Name:
            </label>
            <input
              type="text"
              placeholder="Insert the name of the medicine"
              className="input-name"
              value={drugName}
              onChange={(e) => {
                setDrugName(e.target.value);
              }}
            />
          </section>
          <section className="amount-section">
            <label htmlFor="" className="amount-label">
              Amount:
            </label>
            <input
              type="number"
              placeholder="Insert the amount"
              className="input-amount"
              value={itemPerPackage}
              onChange={(e) => {
                setItemPerPackage(parseInt(e.target.value));
              }}
            />
          </section>
          <section className="issued-section">
            <label htmlFor="" className="issued-label">
              Issued On:
            </label>
            <input
              type="date"
              className="input-issued"
              value={issuedDate}
              onChange={(e) => {
                setIssuedDate(e.target.value);
              }}
            />
          </section>
          <section className="expire-section">
            <label htmlFor="" className="expire-label">
              Expires On:
            </label>
            <input
              type="date"
              className="input-expire"
              value={expiresDate}
              onChange={(e) => {
                setExpiresDate(`${e.target.value}`);
              }}
            />
          </section>
          <section className="companies-section">
            <label htmlFor="" className="companies-label">
              Companies:
            </label>
            <select
              name="companies"
              className="companies-select"
              value={manufac}
              onChange={(e) => {
                setManufac(e.target.value);
              }}
            >
              {manufacturers.map((item, key) => (
                <option value={item.name} key={key}>
                  {item.name}
                </option>
              ))}
            </select>
          </section>
          <section className="register">
            <button type="submit" className="button-register">
              Register
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};
