import { Image } from "react-bootstrap"
const SectionTeam = ({team}) => {
    return (
        <>
        <div className="mb-4">
            <h2 className="h2">{team?.name}</h2><div>
            <Image src={team?.poster} alt={team?.name} />
            </div>
            <span><strong>Stadium: </strong> {team?.stadium} </span>
            <span><strong>Sport :</strong>  {team?.sport?.sport} </span>
         </div>
        </>
    )
}
export default SectionTeam