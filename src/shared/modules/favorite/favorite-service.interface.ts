export interface FavoriteService {
  add(userId: string, offerId: string): Promise<void>;
  remove(userId: string, offerId: string): Promise<void>;
  exists(userId: string, offerId: string): Promise<boolean>;
}
