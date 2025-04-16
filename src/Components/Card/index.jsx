
export default function Card({children}){
    return (
        <div className="m-4 max-w-screen-md w-full p-6 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg ">
            {children}
        </div>
    )
}