from faker import Faker
from mongo_helper import getMongoCollection

fake = Faker()
seed_amount = 25


def _generate_single_():
    return {"title": fake.company(), "description": fake.sentence()}


def generate(amount):
    result = map(lambda _: _generate_single_(), range(0, amount))
    print(f"Generated {amount} records")
    return result


products = getMongoCollection()
toInsert = generate(seed_amount)
products.insert_many(toInsert)
