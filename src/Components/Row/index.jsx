export default function Row({children, className=""}){
    return (
        <div className={`flex flex-wrap -mx-2 ${className} justify-center`}>
            {children}
        </div>
    )
}