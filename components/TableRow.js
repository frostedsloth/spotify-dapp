import { useContext } from "react"
import SpotifyContext from "../context/context"


const TableRow = ({ song }) => {
  const {playOnSelect} = useContext(SpotifyContext)
   return (
    <tbody>
        <tr onClick={() => playOnSelect(song)}>
      
        <th className={styles.th}>{song.index}</th>
        <th className={styles.th}>
          <div>
            <p className="font-bold">{song.title}</p>
            <p className="opacity-50">{song.artiste}</p>
            {/* <p className="opacity-50">{props.artiste}</p> */}
          </div>
        </th>
        <th className={styles.th}>{song.plays}</th>
        {/* <th className={styles.th}>{props.plays}</th> */}
        <th className={styles.th}>{song.songLength}</th>
        {/*<th className={styles.th}>{props.songLength}</th> */}
      </tr>
    </tbody>
  )
}

export default TableRow

const styles = {
  th: `pb-5 hover:opacity-50 cursor-pointer`,
}