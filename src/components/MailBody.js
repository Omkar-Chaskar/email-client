import { useEffect } from 'react';
import "../style/mailbody.css";
import { useSelector, useDispatch } from 'react-redux';
import { selectAllMails, getMailStatus, getMailError, getMail, filterUnread, filterRead, filterFavorite, filterMails} from '../features/mail/mailSlice';
import { selectBody, getBody} from '../features/body/bodySlice';
import { addToRead } from '../features/read/readSlice';
import Slave from './Slave';

function MailBody() {

    const dispatch = useDispatch();

    const list = useSelector(selectAllMails);
    const listStatus = useSelector(getMailStatus);
    const listError = useSelector(getMailError);
    const body = useSelector(selectBody);
    const favorite = useSelector((store) => store.favorite);
    const read = useSelector((store) => store.read);
    const filterMail = useSelector(filterMails);

    useEffect(()=> {
        if(listStatus === 'idle'){
            dispatch(getMail());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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

    let newBody = [];

    let newList = filterMail.length>0 ? filterMail : list;

    newBody = newList.filter( list => list.id === body.id );

    let mailList;
    if(listStatus === 'loading'){
        mailList = <p>"Loading...."</p>
    } else if(listStatus === 'idle'){
        mailList = newList.map(mail => {
            return (
                <article className={read?.read?.some((item) => item.id === mail.id)?'mail-section read':'mail-section'} key={mail.id} onClick={()=> handleClickEvent(mail)}>
                    <div className='avatar-section'>
                        <p className='avatar'>{mail.from.name.toUpperCase().split("")[0]}</p>
                    </div>
                    <section className='mail-body'>
                        <section className='mail-from'>
                            <p className='mail-from-title1'>From:</p>
                            <h5 className='mail-from-title2'>{mail.from.name} &#60;{mail.from.email}&#62;</h5>
                        </section>
                        <section className='mail-subject'>
                            <p className='mail-subject-title1'>Subject:</p>
                            <h5 className='mail-subject-title2'>{mail.subject}</h5>
                        </section>
                        <section className='mail-content'>
                            <p>{mail.short_description}</p>
                        </section>
                        <section className='mail-footer'>
                            <section className='mail-timestamp'>
                                <span className='mail-date'>{getDate(mail.date)}</span>
                                <span className='mail-time'>{getTime(mail.date)}</span>
                            </section>
                            {
                            favorite?.favorite?.some((item) => item.id === mail.id) ? ( <section className='mail-mark'>
                                <h5>Favorite</h5>
                            </section>
                            ) : (<></>)
                            }
                        </section>
                    </section>
                </article>
            )
        })
    } else if(listStatus === 'fail'){
        mailList = <p>{listError}</p>
    }

    const handleClickEvent = (mail) => {
        dispatch(getBody(mail));
        dispatch(addToRead(mail));
    }

  return (
    <main className='mailbody'>
        <nav className='filter'>
            <div className='filter-heading'>
                <h4>Filter By:</h4>
            </div>
            <ul className='filter-menu'>
                <li><button onClick={()=>{ dispatch(filterUnread(read.read));}}>Unread</button></li>
                <li><button onClick={()=>{ dispatch(filterRead(read.read));}}>Read</button></li>
                <li><button onClick={()=>{ dispatch(filterFavorite(favorite.favorite));}}>Favorites</button></li>
            </ul>
        </nav>
        <section className={newBody.length > 0 ? 'master-slave-flex': 'master-slave' }>
            <div className='master'>
                <div className='master-slide'>
                    { mailList }
                </div>
            </div>
            < Slave />
        </section>
    </main>
  )
}

export default MailBody