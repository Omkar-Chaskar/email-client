import "../style/mailbody.css";
import { useSelector, useDispatch } from 'react-redux';
import { selectAllMails} from '../features/mail/mailSlice';
import { selectBody} from '../features/body/bodySlice';
import { addToFavorite , removeFromFavorite } from '../features/favorite/favoriteSlice';

function Slave() {

    const dispatch = useDispatch();

    const list = useSelector(selectAllMails);
    const body = useSelector(selectBody);
    const favorite = useSelector((store) => store.favorite);

    let newBody = [];
    newBody = list.filter( list => list.id === body.id );

    const getDate = (date) => {
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [day, month, year].join('/');
    }

    const getTime = (time) => {
        let d = new Date(time);
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    const isFavorite = favorite?.favorite?.some((item) => item.id === newBody[0].id);

  return (
    <>
    {newBody.length > 0 && <div className='slave'>
                {  newBody.map(mail => {
                return (
                    <article className='mail-section body-section read' key={mail.id} >
                        <div className='avatar-section'>
                            <p className='avatar'>{mail.from.name.toUpperCase().split("")[0]}</p>
                        </div>
                        <section className='slave-body'>
                            <section className='body-header'>
                                <section className='body-subject'>
                                    <h2>{mail.subject}</h2>
                                    <section className='body-timestamp'>
                                        <span className='mail-date'>{getDate(mail.date)}</span>
                                        <span className='mail-time'>{getTime(mail.date)}</span>
                                    </section>
                                </section>
                                <section className='body-mark'>
                                    { isFavorite ? (
                                        <button className='fav-button' onClick={()=>{dispatch(removeFromFavorite(mail)); console.log(favorite); console.log(isFavorite + "remove"); console.log(newBody);}}>Unmark as Favorite</button>
                                        ):(
                                        <button className='fav-button' onClick={()=>{dispatch(addToFavorite(mail)); console.log(favorite?.favorite[0].id); console.log(isFavorite + "add"); console.log(newBody[0].id);}}>Mark as Favorite</button>
                                        )
                                    }
                                </section>
                            </section>
                            <section className='body-content'>
                                <article dangerouslySetInnerHTML={{__html: body.body}}></article>
                            </section> 
                        </section>
                    </article>
                )
            }) }
            </div>
            }
        </>
  )
}

export default Slave