import { CardConditionOwnedDTO } from "../models/MyCards/CardConditionsOwnedDTO";

const isAdded = (old: CardConditionOwnedDTO[], _new: CardConditionOwnedDTO[]) => {
    return _new.filter(newItem => !findByIdOrCondition(old, newItem));
}

const isUpdated = (old: CardConditionOwnedDTO[], _new: CardConditionOwnedDTO[]) => {
    return _new.filter(newItem => {
        const oldItem = findByIdOrCondition(old, newItem);
        return oldItem && oldItem.quantity !== newItem.quantity;
    });
}

const isDeleted = (old: CardConditionOwnedDTO[], _new: CardConditionOwnedDTO[]) => {
    return old.filter(oldItem => !findByIdOrCondition(_new, oldItem));
}

const findByIdOrCondition = (arr: CardConditionOwnedDTO[], item: CardConditionOwnedDTO) =>
    arr.find(el => el.id ? el.id === item.id : el.condition === item.condition);


export { isAdded, isUpdated, isDeleted };