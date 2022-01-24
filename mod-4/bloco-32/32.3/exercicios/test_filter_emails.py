import filter_emails


def test_returns_filtered_list():
    full_list = ['nome@dominio.com', 'errad#@dominio.com', 'outro@dominio.com']
    filtered_list = ['nome@dominio.com', 'outro@dominio.com']

    assert(filter_emails.get_filtered(full_list)) == filtered_list
