import {EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent} from 'typeorm';
import {Content} from '../entity/Content';
import slugify from 'slugify';

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Content> {
    public listenTo() {
        return Content
    }

    public beforeInsert(event: InsertEvent<Content>) {
        event.entity.slug = slugify(event.entity.title, {lower: true})
    }

    public beforeUpdate(event: UpdateEvent<Content>) {
        const {entity} = event;
        if(entity instanceof Content){
            entity.slug = slugify(entity.title, {lower: true})
        }
    }
}