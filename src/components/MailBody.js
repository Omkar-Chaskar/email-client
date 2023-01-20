import { useEffect } from 'react';
import "../style/mailbody.css";
import { useSelector, useDispatch } from 'react-redux';
import { selectAllMails, getMailStatus, getMailError, getMail } from '../features/mail/mailSlice';

function MailBody() {

    const dispatch = useDispatch();

    const list = useSelector(selectAllMails);
    const listStatus = useSelector(getMailStatus);
    const listError = useSelector(getMailError);

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
        console.log(d);
        console.log(strTime);
        return strTime;
    }

    let content;
    if(listStatus === 'loading'){
        content = <p>"Loading...."</p>
    } else if(listStatus === 'idle'){
        content = list.map(mail => {
            return (
                <article className='mail-section read' key={mail.id}>
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
                            <section className='mail-mark'>
                                <h5>Favorite</h5>
                            </section>
                        </section>
                    </section>
                </article>
            )
        })
    } else if(listStatus === 'fail'){
        content = <p>{listError}</p>
    }

  return (
    <main className='mailbody'>
        <nav className='filter'>
            <div className='filter-heading'>
                <h4>Filter By:</h4>
            </div>
            <ul className='filter-menu'>
                <li><button>Unread</button></li>
                <li><button>Read</button></li>
                <li><button>Favorites</button></li>
            </ul>
        </nav>
        <section>
            { content }
        </section>
    </main>
  )
}

export default MailBody