import React, { FC, SyntheticEvent } from 'react';
import { Button } from './button/Button';
import { Input } from './input/Input';
import styles from './app.module.css';
import { Card } from './grid/Card';
import { Grid } from './grid/Grid';
import { Spinner } from './spinner/Spinner';
import noResult from '../assets/noResult.gif';
import { useAppState } from './appState';

const ROW_SPAN = 25;
const ROW_GAP = 5;
const COLUMN_GAP = 5;
const ITEM_WIDTH = 200;

const App: FC = () => {
  const {
    loadInitial,
    loading,
    loadMore,
    gifs,
    value,
    setValue,
    clear,
    remove,
  } = useAppState();

  let content: any = <img className={styles.noResult} src={noResult} />;
  if (loading) {
    content = <Spinner className={styles.spinner} />
  } else if (!gifs) {
    content = null;
  } else if (gifs.length > 0) {
    const addonAfter = (
      <div className={styles.loadMore}>
        <Button onClick={loadMore} color="#F8B195">Load More</Button>
      </div>
    )
    content = (
      <Grid
        columnGap={COLUMN_GAP}
        itemWidth={ITEM_WIDTH}
        rowSpan={ROW_SPAN}
        className={styles.grid}
        addonAfter={addonAfter}
      >
        {
          gifs.map((gif) => (
            <Card
              totalMargin={ROW_GAP}
              rowSpan={ROW_SPAN}
              key={gif.id}
              remove={remove}
              {...gif}
            />
          ))
        }
      </Grid>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.utilityBelt}>
        <Input
          value={value}
          className={styles.input}
          onChange={(event: SyntheticEvent<HTMLInputElement>) => setValue(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              loadInitial('search', value);
            }
          }}
        />
        <Button
          className={styles.button}
          color="#F8B195"
          onClick={() => loadInitial('search', value)}
        >
          search
        </Button>
        <Button
          className={styles.button}
          color="#F67280"
          onClick={() => {
            setValue('trending');
            loadInitial('trending')
          }}
        >
          trending
             </Button>
        <Button className={styles.button} onClick={clear}>clear</Button>
      </div>
      {content}
    </div>
  )
}

export default App;
