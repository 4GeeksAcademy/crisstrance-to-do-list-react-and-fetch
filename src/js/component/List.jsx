import React, { useEffect, useState } from "react";

const List = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        console.log("Cargando componente...");
        iniList();
    }, []);

    async function iniList() {
        try {
            let response = await fetch("https://playground.4geeks.com/todo/users/crisstrance", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.status === 404) {
                await fetch("https://playground.4geeks.com/todo/users/crisstrance", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                return iniList();
            }

            if (response.ok) {
                let data = await response.json();
                console.log("Usuario Creado");
                setTodos(data.todos);
            } else {
                console.error('Error al obtener la lista:', response.status);
            }
        } catch (error) {
            console.error('Error en la red:', error);
        }
    }

    const addArray = async (e) => {
        if (e.key === "Enter" && inputValue.trim()) {
            const newItem = { label: inputValue };

            try {
                const response = await fetch("https://playground.4geeks.com/todo/todos/crisstrance", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newItem),
                });
                if (response.ok) {
                    const data = await response.json();
                    setTodos([...todos, data]);
                    setInputValue("");
                } else {
                    console.error("Error al agregar el item:", response.statusText);
                }
            } catch (error) {
                console.error("Error en la conexión:", error);
            }
        }
    };

    const deleteItem = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.ok) {
                setTodos(todos.filter(item => item.id !== id));
                console.log("Item eliminado:", id);
            } else {
                console.error("Error al borrar el item:", response.statusText);
            }
        } catch (error) {
            console.error("Error en la conexión:", error);
        }
    };

    const deleteAll = async () => {
        try {
            const deleteResponse = await fetch("https://playground.4geeks.com/todo/users/crisstrance", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (deleteResponse.ok) {
                console.log("Items eliminados:");
                await fetch("https://playground.4geeks.com/todo/users/crisstrance", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                setTodos([]);

            } else {
                console.error("Error al borrar el item:", deleteResponse.statusText);
            }
        } catch (error) {
            console.error("Error en la conexión:", error);
        }
    };


    return (
        <div className="container w-50 justify-content-center">
            <ul className="list-group border-none">
                <li className="list-group-item">
                    <input
                        type="text"
                        value={inputValue}
                        onKeyDown={addArray}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </li>
                {todos.map((item) => (
                    <li key={item.id} className="item list-group-item d-flex justify-content-between align-items-center">
                        <div className="align-items-center">
                            <input className="form-check-input text-success me-1" type="checkbox" id="checkboxNoLabel" value="" aria-label="" />{item.label}
                        </div>
                        <button className="btn btn-sm delete-button" onClick={() => deleteItem(item.id)}>
                            <i className="fas fa-backspace text-danger"></i>
                        </button>
                    </li>
                ))}
            </ul>
            <div className="btn-group" role="group" aria-label="Basic example">
                <div className="d-flex">
                    <button type="button" className="btn btn-danger mt-2 ms-auto" onClick={deleteAll}>Delete all</button>
                </div>
            </div>
        </div>
    );
};

export default List;
