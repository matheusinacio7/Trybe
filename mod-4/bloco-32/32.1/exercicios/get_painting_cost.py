import math


def get_painting_cost(*, area, coverage, bucket_capacity, bucket_cost):
    bucket_coverage = coverage * bucket_capacity
    buckets_needed = math.ceil(area / bucket_coverage)
    return bucket_cost * buckets_needed


if (__name__ == '__main__'):
    print(
        get_painting_cost(area=100,
                          coverage=3,
                          bucket_capacity=18,
                          bucket_cost=80)
    )
