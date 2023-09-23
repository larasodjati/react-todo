import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; {new Date().getFullYear()} Larasati Sodjati</p>
      <p>
        Image by{' '}
        <a href="https://www.freepik.com/free-photo/wall-with-sticky-notes_6582962.htm#query=wall%20sticky%20note&position=2&from_view=search&track=ais">
          Freepik
        </a>
      </p>
    </footer>
  );
}

export default Footer;
