import csv
import json
from collections import Counter


def get_books_from_weird_json_file(file):
    return [json.loads(line) for line in file]


def get_category_percentages(book_list):
    total_books = len(book_list)
    categories = [category
                  for book in book_list
                  for category in book["categories"]]
    categories_count = Counter(categories)
    categories_percentages = {cat: count / total_books
                              for (cat, count) in categories_count.items()}
    return categories_percentages


def write_to_csv(file, category_percentages):
    headers = ['Category', 'Percentage']
    rows = list(category_percentages.items())
    writer = csv.writer(file)
    writer.writerow(headers)
    writer.writerows(rows)


if (__name__ == '__main__'):
    with open('books.json') as file:
        books = get_books_from_weird_json_file(file)

    percentages = get_category_percentages(books)

    with open('report.csv', mode='w') as file:
        write_to_csv(file, percentages)
