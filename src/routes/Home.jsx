import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import url from "../axios/config"
import "./Home.css"

const Home = () => {
    const [product, setProduct] = useState([])

    const getProduct = async () => {
        try {
            const response = await url.get("/products")
            const data = response.data

            setProduct(data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProduct = async (id_produto) => {
        await url.delete(`/product/${id_produto}`)
    }

    useEffect(() => {
        getProduct()
    }, [deleteProduct])

    return (
        <div className="home">
            <h1>Products</h1>
            {product.length === 0 ? (
                <p>Sorry, we don't have any products listed yet.</p>
            ) : (
                product.map((product) => (
                    <div className="product" key={product.id_produto}>
                        <div className="image">
                            <img src={`http://localhost:5000/${product.imagem}`} />
                        </div>
                        <div className="infos">
                            <h4>{product.nome}</h4>
                            <p>{product.descricao}</p>
                            <p className="price">R$ {product.preco}</p>
                            <div className="btn-area">
                                <Link to={`/product/${product.id_produto}`} className="btn">
                                    Know more
                                </Link>
                                <Link
                                    to={`/product/edit/${product.id_produto}`}
                                    className="btn edit-btn"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteProduct(product.id_produto)}
                                    className="btn delete-btn"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}
export default Home