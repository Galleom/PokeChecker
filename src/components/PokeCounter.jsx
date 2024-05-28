export default function PokeCounter( { items} ){
    return(
        <div className="text-light">
        <p>Total Pokemon: {items.length ? String(items.length) : "0"}</p>
        </div>
    )
}