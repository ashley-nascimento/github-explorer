//Exemplo de componente

import { useState, useEffect } from "react";
import { RepositoryItem } from "./RepositoryItem"

const repositoryTitle = "Lista de Repositórios"

// const repository = {
//     name: "Unform",
//     description: "Forms in React.js",
//     link: "https://github.com/unform/unform"
// }

export function RepositoryList(){

    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        fetch('https://api.github.com/users/ashley-nascimento/repos')
        .then(response => response.json())
        .then(data => setRepositories(data))
    }, [])

    return(
        <section className="repository-list">
            <h1>{repositoryTitle}</h1>

            <ul>
                {repositories.map(repository =>{
                        return <RepositoryItem key={repository.name} repository={repository}/>
                    })}
            </ul>
        </section>
    );
}