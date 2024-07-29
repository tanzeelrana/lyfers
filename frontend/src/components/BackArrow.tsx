import { useNavigate } from "react-router-dom"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import "./styles.scss";

export default function BackArrow() {
    const navigate = useNavigate();

    return (
        <ChevronLeftIcon onClick={() => navigate(-1)} fontSize="large" sx={{ cursor: "pointer", marginBottom: "20px" }} />
    );
}
