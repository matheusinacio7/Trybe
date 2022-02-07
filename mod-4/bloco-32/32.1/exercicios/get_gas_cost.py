gas_sale_discounts = {
    "A": [(20, 0.03), (None, 0.05)],
    "G": [(20, 0.05), (None, 0.06)],
}


gas_cost_per_litre = {
    "A": 1.90,
    "G": 2.50,
}


def get_discount_rate(*, type, amount):
    discounts = gas_sale_discounts[type]

    for discount in discounts:
        if not discount[0]:
            return discount[1]

        if discount[0] > amount:
            return discount[1]


def get_gas_cost(*, type, amount):
    cost_per_litre = gas_cost_per_litre[type]
    discount_rate = get_discount_rate(type=type, amount=amount)

    discounted_price = cost_per_litre * (1 - discount_rate)
    return discounted_price * amount


if (__name__ == '__main__'):
    print(get_gas_cost(type="A", amount=25))
