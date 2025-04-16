import Card from "../../Components/Card"
import Row from "./../../Components/Row"
import Col from "./../../Components/Col"
import MenuBar from "../../Components/MenuBar"



export default function AdminLayout(){
    
    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 text-center  text-gray-900 dark:text-white flex flex-col items-center'>

            <Row className="w-full">
                <MenuBar />
            </Row>
            <Row >
                <Col size={6}>
                    esto es algo
                </Col>
                <Col size={6}>
                    esto es algo
                </Col>
            </Row>
        

        </div>
    )
}