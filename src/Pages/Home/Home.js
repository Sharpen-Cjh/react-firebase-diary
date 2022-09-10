import React from 'react';

import DiaryForm from './DiaryForm';
import DiaryList from './DiaryList';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

import styles from './Home.module.css';

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection('diary', ["uid", '==', user.uid]);
  return (
    <main className={styles.cont}>
      <aside className={styles.side_menu}>
        <DiaryForm uid={user.uid}></DiaryForm>
      </aside>
      <ul className={styles.content_list}>
        {error && <storng>{error}</storng>}
        {documents && <DiaryList diaries={documents} />}
      </ul>
    </main>
    )
}