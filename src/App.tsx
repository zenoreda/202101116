import { useState } from "react";
import DataTable from "./DataTable";
import styles from "./App.module.scss";
import { Button, FormControl, Paper, TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";
import Detail from "./Detail";

const items = [...Array(15)].map((_, i) => ({
  value: i,
}));

function App() {
  const [count, setCount] = useState(0);
  const [person, setPerson] = useState({
    firstName: "Taro",
    lastName: "Yamada",
    age: 14,
    pet: {
      name: "Pochi",
      age: 3,
    },
  });

  return (
    <div className={styles.app}>
      <DataTable
        className={styles.table}
        columns={[
          { label: "ラベル1", valuefn: (_, i) => i, align: "right" },
          { label: "ラベル2", valuefn: (x) => `データ${x.value}` },
          { label: "ラベル3", valuefn: (x) => `データ${x.value + x.value}` },
          { label: "ラベル4", valuefn: (x) => `データ${x.value * x.value}` },
        ]}
        rows={items}
      />
      <Paper sx={{ width: 400, padding: 2 }}>
        <Detail
          value={person}
          onChange={(val) => setPerson(val)}
          rows={[
            {
              prop: ["lastName"],
              render: (lastName, setLastName) => (
                <TextField
                  label="苗字"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              ),
            },
            {
              prop: ["firstName"],
              render: (firstName, setFirstName) => (
                <TextField
                  label="名前"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              ),
            },
            {
              prop: ["age"],
              render: (age, setAge) => (
                <TextField
                  type="number"
                  label="年齢"
                  value={String(age)}
                  onChange={(e) =>
                    setAge(e.target.value ? Number(e.target.value) : 0)
                  }
                />
              ),
            },
            {
              prop: ["pet", "name"],
              render: (name, setName) => (
                <TextField
                  label="ペットの名前"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ),
            },
          ]}
        />
      </Paper>
    </div>
  );
}

export default App;
