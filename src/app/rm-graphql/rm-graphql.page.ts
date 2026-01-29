import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { RickMortyGqlService, GqlResponse } from '../services/rickmorty-gql.service';

/* =======================
   TIPOS
======================= */
type EpisodeCard = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
};

type EpisodesQueryData = {
  episodes: { results: EpisodeCard[] };
};

type EpisodeCharacter = {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
};

type EpisodeDetail = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
  characters: EpisodeCharacter[];
};

type EpisodeDetailQueryData = {
  episode: EpisodeDetail | null;
};

/* =======================
   QUERIES
======================= */
const GET_EPISODES_SIMPLE = `
  query GetEpisodes {
    episodes {
      results {
        id
        name
        episode
        air_date
      }
    }
  }
`;

const GET_EPISODE_DETAIL = `
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      episode
      air_date
      characters {
        id
        name
        status
        species
        image
      }
    }
  }
`;

@Component({
  selector: 'app-rm-graphql',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './rm-graphql.page.html',
})
export class RmGraphqlPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  loadingList = true;
  loadingDetail = false;

  episodes: EpisodeCard[] = [];
  selectedEpisode: EpisodeDetail | null = null;

  isModalOpen = false;

  constructor(private gql: RickMortyGqlService) {}

  ngOnInit(): void {
    this.gql
      .query<EpisodesQueryData>(GET_EPISODES_SIMPLE)
      .pipe(finalize(() => (this.loadingList = false)))
      .subscribe(res => {
        this.episodes = res.data?.episodes?.results ?? [];
      });
  }

  openDetail(id: string) {
    this.isModalOpen = true;
    this.loadingDetail = true;
    this.selectedEpisode = null;

    this.gql
      .query<EpisodeDetailQueryData>(GET_EPISODE_DETAIL, { id })
      .pipe(finalize(() => (this.loadingDetail = false)))
      .subscribe(res => {
        this.selectedEpisode = res.data?.episode ?? null;
      });
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedEpisode = null;
  }

  trackById(_: number, e: EpisodeCard) {
    return e.id;
  }
}
