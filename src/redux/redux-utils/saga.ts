import {
  select,
  SelectEffect,
} from 'redux-saga/effects';
import { StateType } from '../reducer';

export function selectState(selector: (s: StateType) => any): SelectEffect {
  return select(selector);
}
