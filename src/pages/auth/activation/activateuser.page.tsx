import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingComponent from "../../../components/common/loading/loading.component";
import { MessageConstants } from "../../../config/constant.config";
import authSvc from "../register/auth.service";


const UserActivation = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState("");
    let [openModal, setOpenModal] = useState(false);
    let navigate = useNavigate();

    const activateuser = async () => {
        try {//api call 
            await authSvc.getRequest('/auth/activate/' + params.token);
            setMsg("Your account has been successfully activated,please login to continue..")
        } catch (exception: any) {

            if (+exception.status === 422 && exception.data.message === MessageConstants.TOKEN_EXPIRED) {
                //ask user to resend token
                setOpenModal(true)
            }
            toast.error(exception.data.message);
             navigate("/login");
        } finally {
            setLoading(false);
        }
    }
    const ResendToken = async () => {
        try {
            await authSvc.getRequest("/auth/resend-activationtoken/" + params.token);
            setMsg("A new token has been send to your registered email.")
            setLoading(false);
            setOpenModal(false);
        } catch (exception) {
            toast.error("Error sending activation token ");

        }
    }

    useEffect(() => {
        //api 
        activateuser()
    }, [])
    return (<>
        <section className="bg-teal-200">
            <div className="flex items-center justify-center min-h-screen px-8  sm:px-12  lg:px-16 ">
                {
                    loading ? <div className="items-center justify-center ">
                        <LoadingComponent />
                    </div> : <>
                        <div className="flex items-center pt-10 mt-10 text-xl text-cyan-900 ">
                            {msg}
                        </div>
                    </>
                }

            </div>
        </section>

        <Modal show={openModal} data-backdrop="static" data-keyboard='false'>
            <Modal.Header className="bg-red-400 ">Your Activation Token Has Expired</Modal.Header>
            <Modal.Body className="bg-teal-200 ">
                <div >
                    <p className="text-base leading-relaxed text-cyan-500 dark:text-white">
                        It seems your activation token is no longer valid.

                        Would you like to resend the activation token?
                    </p>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={ResendToken}>Resend Token</Button>
                <Button color="red" onClick={() => setOpenModal(false)}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>

    </>)
}
export default UserActivation;