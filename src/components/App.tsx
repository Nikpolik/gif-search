import React, { FC, useState, SyntheticEvent, useCallback } from 'react';
import { usePersistentState } from '../hooks/useStorage';
import { search, Images, trending } from '../api/giphy';
import { Button } from './button/Button';
import { Input } from './input/Input';
import styles from './app.module.css';
import { Card } from './card/Card';
import { Spinner } from './spinner/Spinner';

const App: FC = () => {
  const [images, setImages] = usePersistentState<Images[]>('urls', []);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const searchGif = useCallback(async () => {
    setLoading(true);
    const newImages = await search(value);
    setImages(newImages);
    setLoading(false);
  }, [value]);
  const getTrending = useCallback(async () => {
    setLoading(true);
    const newImages = await trending();
    setImages(newImages);
    setLoading(false);
  }, []);
  const clear = () => {
    setImages([]);
  }
  const remove = () => {

  }


  let content: any = <div>Nothing to see here :D</div>
  if (loading) {
    content = <Spinner />
  }
  if (images.length > 0) {
    content = images.map((image) => (
      <Card {...image} />
    ))
  }

  return (
    <div className={styles.container}>
      <div className={styles.utilityBelt}>
        <Input className={styles.input} onChange={(event: SyntheticEvent<HTMLInputElement>) => setValue(event.currentTarget.value)} />
        <Button className={styles.button} color="#ed3330" onClick={searchGif}>search</Button>
        <Button className={styles.button} color="#FF00AA" onClick={getTrending}>trending</Button>
        <Button className={styles.button} onClick={clear}>clear</Button>
      </div>
      <div className={styles.grid}>
        {content}
      </div>
    </div>
  )
}

export default App;
