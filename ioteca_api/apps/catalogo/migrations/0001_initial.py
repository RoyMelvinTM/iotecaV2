# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-31 03:39
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Autor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
                ('direccion', models.TextField(blank=True, null=True)),
                ('fecha_nac', models.DateField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Autor',
                'verbose_name_plural': 'Autores',
            },
        ),
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=60)),
                ('codigo', models.CharField(blank=True, max_length=60, null=True)),
                ('estado', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name': 'Categoria',
                'verbose_name_plural': 'Categorias',
            },
        ),
        migrations.CreateModel(
            name='Ejemplar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Ejemplar',
                'verbose_name_plural': 'Ejemplares',
            },
        ),
        migrations.CreateModel(
            name='Libro',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
                ('tipo', models.CharField(choices=[('FISICO', 'Fisico'), ('VIRTUAL', 'Virtual'), ('FIS_VIR', 'FisicoVirtual')], default='FISICO', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('autors', models.ManyToManyField(blank=True, to='catalogo.Autor')),
                ('categoria', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='catalogo.Categoria')),
            ],
            options={
                'verbose_name': 'Libro',
                'verbose_name_plural': 'Libros',
            },
        ),
        migrations.AddField(
            model_name='ejemplar',
            name='libro',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='catalogo.Libro'),
        ),
    ]